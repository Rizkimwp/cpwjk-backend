import { Injectable } from '@nestjs/common';
import { FAQ_DATA } from './faq.data';
import { ChatbotDto } from './dto/chatbot.dto';
import * as stringSimilarity from 'string-similarity';
@Injectable()
export class ChatbotService {
  answer(data: ChatbotDto): string {
    const lowerQuestion = data.question.toLowerCase();

    // Ambil daftar pertanyaan dari FAQ
    const questions = FAQ_DATA.map((item) => item.q.toLowerCase());

    // Cari pertanyaan paling mirip
    const match = stringSimilarity.findBestMatch(lowerQuestion, questions);
    const bestMatchIndex = match.bestMatchIndex;
    const bestMatchRating = match.bestMatch.rating;

    // Tentukan threshold kemiripan
    if (bestMatchRating >= 0.5) {
      return FAQ_DATA[bestMatchIndex].a;
    } else {
      return 'Maaf, saya belum punya jawaban untuk pertanyaan itu.';
    }
  }
}
