import { Consumer, SQSMessage } from 'sqs-consumer';
import UsersService from '@services/users.service';
import { SqsEventMessage } from '@/consumer/message.types';
import { QUEUE_URL } from '@config';

export class SqsMessageProcessor {
  private userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  public initConsumer() {
    const app = Consumer.create({
      queueUrl: QUEUE_URL,
      messageAttributeNames: ['All'],
      handleMessage: async message => {
        await this.handleMessage(message);
      },
    });
    app.on('error', err => {
      console.error(err.message);
    });
    app.on('processing_error', err => {
      console.error(err.message);
    });
    app.start();
  }

  private async handleMessage(sqsMessage: SQSMessage) {
    const eventMessage: SqsEventMessage = JSON.parse(sqsMessage.Body || '{}');
    if (!sqsMessage) {
      console.warn('unwantedMessage: ' + { message: eventMessage });
      return;
    }

    switch (eventMessage.eventType) {
      case 'USER_OBFUSCATION':
        await this.userService.obfuscateUser(Number(eventMessage.data));
        break;
      case 'ALL_USERS_OBFUSCATION':
        await this.userService.obfuscateAllUsers();
        break;
      default:
        console.error('unknownEventMessage ' + { message: eventMessage });
    }
  }
}
