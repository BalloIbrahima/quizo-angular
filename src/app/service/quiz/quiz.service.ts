import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Quiz } from '../../entite/quiz/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = environment.apiUrl+'/questions';
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  getRandomQuestions(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.apiUrl}/random`);
  }

  addQuestion(questionData: { question: string, options: string[], correctAnswer: number }): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, questionData);
  }

  updateQuestion(id: string, questionData: { question: string, options: string[], correctAnswer: number }): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/${id}`, questionData);
  }

  deleteQuestion(id: string): Observable<Quiz> {
    return this.http.delete<Quiz>(`${this.apiUrl}/${id}`);
  }
}
