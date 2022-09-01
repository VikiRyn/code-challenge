import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Matrix } from '../models/matrix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatrixService {
  baseUrl = 'http://localhost:3400/api/center-matrix';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matrix[]> {
    return this.http.get<Matrix[]>(this.baseUrl, {
      params: new HttpParams().append('limit', 5),
    });
  }

  get(id: number): Observable<Matrix> {
    return this.http.get<Matrix>(`${this.baseUrl}/${id}`);
  }

  create(matrix: Matrix): Observable<Matrix> {
    return this.http.post<Matrix>(this.baseUrl, matrix);
  }

  update(id: number, data: Matrix): Observable<Matrix> {
    return this.http.put<Matrix>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
