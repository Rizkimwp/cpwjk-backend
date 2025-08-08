import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotDto } from './dto/chatbot.dto';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  chat(@Body() data: ChatbotDto) {
    const reply = this.chatbotService.answer(data);
    return { reply };
  }
}
