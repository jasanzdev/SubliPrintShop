import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessPayload } from 'src/common/interfaces/payloads.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { envs } from 'src/config/envs';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async validateRefreshToken({
    token,
    email,
  }: {
    email: string;
    token: string;
  }): Promise<boolean> {
    const refreshToken = await this.refreshTokenModel
      .findOne({ email: email })
      .exec();

    if (!refreshToken) return false;

    return await bcrypt.compare(token, refreshToken.token);
  }

  async generateTokens(payload: AccessPayload) {
    const { sub, email, role } = payload;
    const newAccessToken = await this.jwtService.signAsync(
      { sub, email, role },
      { secret: envs.jwtAccessSecret, expiresIn: '15m' },
    );

    const newRefreshToken = await this.jwtService.signAsync(
      { email: email },
      { secret: envs.jwtRefreshSecret, expiresIn: '7d' },
    );

    const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);

    await this.refreshTokenModel.findOneAndUpdate(
      { email },
      { token: hashedRefresh },
      { upsert: true },
    );

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }

  async revokeTokens(email: string) {
    await this.refreshTokenModel.deleteOne({ email: email });
  }
}
