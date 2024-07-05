import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz/quiz.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Quiz } from '../../entite/quiz/quiz';

@Component({
  selector: 'app-play-quizo',
  templateUrl: './play-quizo.component.html',
  styleUrl: './play-quizo.component.scss',
  providers: [MessageService]
})
export class PlayQuizoComponent implements OnInit {
  questions: Quiz[] = [];
  currentQuestionIndex = 0;
  selectedOption: number | null = null;
  timer: number = 10;
  interval: any;
  score: number = 0;
  quizFinished: boolean = false;
  constructor(private quizService: QuizService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getRandomQuestions().subscribe(data => {
      this.questions = data;
      this.startTimer();
    });
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = null;
      this.timer = 10;
    } else {
      this.quizFinished = true;
      clearInterval(this.interval);
    }
  }

  onOptionSelected(optionIndex: number): void {
    this.selectedOption = optionIndex;
  }

  submitAnswer(): void {
    if (this.selectedOption === this.questions[this.currentQuestionIndex].correctAnswer) {
      // Correct answer
      this.score += 5; // Add 5 points for the correct answer
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bonne Reponse : +5' });

    } else {
      // Incorrect answer
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Mauvaise Reponse' });

    }
    this.nextQuestion();
  }
}
