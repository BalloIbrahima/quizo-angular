import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz/quiz.service';
import { MessageService } from 'primeng/api';
import { Quiz } from '../../entite/quiz/quiz';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]

})
export class HomeComponent implements OnInit {
  questions: Quiz[] = [];
  newQuestion = '';
  newOptions = ['', '', '', ''];
  correctAnswerIndex = 0;
  editingQuestion: any = null;

  constructor(private quizService: QuizService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe(data => {
      this.questions = data;
    });
  }

  addQuestion(): void {
    if (this.newQuestion.trim() && this.newOptions.every(opt => opt.trim())) {
      const questionData :Quiz= {
        question: this.newQuestion,
        options: this.newOptions,
        correctAnswer: this.correctAnswerIndex
      };
      if (this.editingQuestion) {
        this.quizService.updateQuestion(this.editingQuestion.id, questionData).subscribe(() => {
          this.loadQuestions();
          this.resetForm();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Modifiee' });

        });
      } else {
        this.quizService.addQuestion(questionData).subscribe(() => {
          this.loadQuestions();
          this.resetForm();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question creee' });

        });
      }
    }
  }

  editQuestion(question: any): void {
    this.editingQuestion = question;
    this.newQuestion = question.question;
    this.newOptions = [...question.options];
    this.correctAnswerIndex = question.correctAnswer;
  }

  deleteQuestion(id: string): void {
    this.quizService.deleteQuestion(id).subscribe(() => {
      this.loadQuestions();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question supprimee' });

    });
  }

  resetForm(): void {
    this.newQuestion = '';
    this.newOptions = ['', '', '', ''];
    this.correctAnswerIndex = 0;
    this.editingQuestion = null;
  }
}
