import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { csrf } from '../bootstrap/csrf.config';

@Controller('csrf')
export class CsrfController {
  private readonly generateToken = csrf.generateCsrfToken;

  @Get('csrf-token')
  getCsrf(@Req() req: Request, @Res() res: Response): void {
    const token = this.generateToken(req, res);
    res.json({ csrfToken: token });
  }
}
