import { BadRequestException } from '@nestjs/common';
import { ChallengeStatus } from '../enums/challengeStatus.enum';

export class ChallengeValidationPipe {
  readonly statusArr = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.DENIED,
    ChallengeStatus.CANCELED,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.checkStatus(status)) {
      throw new BadRequestException(`${status} invalid status`);
    }

    return value;
  }

  private checkStatus(status: any) {
    const index = this.statusArr.indexOf(status);

    return index !== -1;
  }
}
