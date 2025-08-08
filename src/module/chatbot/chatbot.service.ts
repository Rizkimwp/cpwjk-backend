import { Injectable } from '@nestjs/common';
import { FAQ_DATA } from './faq.data';
import { ChatbotDto } from './dto/chatbot.dto';

@Injectable()
export class ChatbotService {
  answer(data: ChatbotDto): string {
    const lower = data.question.toLowerCase();
    const match = FAQ_DATA.find((item) => lower.includes(item.q));
    return match
      ? match.a
      : 'Maaf, saya belum punya jawaban untuk pertanyaan itu.';
  }
}
