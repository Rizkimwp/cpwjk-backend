import { Injectable } from '@nestjs/common';
import { FAQ_DATA, FaqItem } from './faq.data';
import { ChatbotDto } from './dto/chatbot.dto';
import * as stringSimilarity from 'string-similarity';
@Injectable()
export class ChatbotService {
  answer(data: ChatbotDto): string {
    const lowerQuestion = data.question.toLowerCase();

    const allKeywords: string[] = FAQ_DATA.flatMap((item: FaqItem) =>
      item.q.map((q) => q.toLowerCase()),
    );

    const match = stringSimilarity.findBestMatch(lowerQuestion, allKeywords);
    const bestMatchRating = match.bestMatch.rating;
    const bestMatchKeyword = match.bestMatch.target;

    const matchedItem = FAQ_DATA.find((item) =>
      item.q.some((q) => q.toLowerCase() === bestMatchKeyword),
    );

    if (matchedItem && bestMatchRating >= 0.5) {
      return matchedItem.a;
    }

    // Jawaban default kalau tidak ditemukan
    return `Maaf, saya belum punya jawaban pasti untuk pertanyaan: "${data.question}". 
Namun saya akan mencatatnya untuk referensi ke depan.`;
  }
}
