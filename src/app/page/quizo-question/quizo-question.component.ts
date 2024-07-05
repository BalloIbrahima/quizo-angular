import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../../entite/quiz/quiz';

@Component({
  selector: 'app-quizo-question',
  templateUrl: './quizo-question.component.html',
  styleUrl: './quizo-question.component.scss'
})
export class QuizoQuestionComponent {

  @Input() question: Quiz=new Quiz();
  @Input() selectedOption: number | null = null;
  @Output() optionSelected = new EventEmitter<number>();

  selectOption(index: number): void {
    this.optionSelected.emit(index);
  }
}
