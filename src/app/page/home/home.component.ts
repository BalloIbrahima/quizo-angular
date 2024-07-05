import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz/quiz.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Quiz } from '../../entite/quiz/quiz';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ConfirmationService, MessageService]

})
export class HomeComponent implements OnInit {
  questions: Quiz[] = [];
  newQuestion = '';
  newOptions = ['', '', '', ''];
  correctAnswerIndex = 0;
  motRecherche=""
  editingQuestion: any = null;

  user:any

  constructor(private quizService: QuizService,
    private messageService: MessageService,private authService: AuthService,
    private confirmationService: ConfirmationService,) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.getUser()
  }

  loadQuestions(): void {
    this.quizService.getQuestions().subscribe(data => {
      this.questions = data;
    });
  }

  getUser(){
    this.authService.getUser().subscribe(data => {
      console.log(data?.email);
      this.user = data;
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

  trackByFn(index: any, item: string) {
    return index;
  }

  confirm(event: Event,id:string) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Veuillez confirmer la suppression, cette action est ireversible .',
        icon: 'pi pi-exclamation-circle',
        acceptIcon: 'pi pi-check mr-1',
        rejectIcon: 'pi pi-times mr-1',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        rejectButtonStyleClass: 'p-button-outlined p-button-sm',
        acceptButtonStyleClass: 'p-button-sm',
        accept: () => {
            this.deleteQuestion(id)
            this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Annuler', detail: 'Suppression Annuler', life: 3000 });
        }
    });
  }


  logout(){
    this.authService.logout();
  }
}
