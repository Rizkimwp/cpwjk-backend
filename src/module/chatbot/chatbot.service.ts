import { Injectable } from '@nestjs/common';
import { FAQ_DATA, FaqItem } from './faq.data';
import { ChatbotDto } from './dto/chatbot.dto';
import * as stringSimilarity from 'string-similarity';
@Injectable()
export class ChatbotService {
  answer(data: ChatbotDto): string {
    const lowerQuestion = data.question.toLowerCase();

    // Gabungkan semua keyword jadi array string
    const allKeywords: string[] = FAQ_DATA.flatMap((item: FaqItem) =>
      item.q.map((q) => q.toLowerCase()),
    );

    // Cari keyword yang paling mirip
    const match = stringSimilarity.findBestMatch(lowerQuestion, allKeywords);
    const bestMatchRating = match.bestMatch.rating;
    const bestMatchKeyword = match.bestMatch.target;

    // Temukan item FAQ yang punya keyword tersebut
    const matchedItem = FAQ_DATA.find((item) =>
      item.q.some((q) => q.toLowerCase() === bestMatchKeyword),
    );

    if (matchedItem && bestMatchRating >= 0.5) {
      return matchedItem.a;
    }

    return 'Maaf, saya belum punya jawaban untuk pertanyaan itu.';
  }
}
