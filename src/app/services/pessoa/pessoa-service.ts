import { Injectable } from '@angular/core';
import { Pessoa } from '../../models/pessoa';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private pessoas: Pessoa[] = []

  tamanhoArray() {
    return this.pessoas.length
  }

  adicionar(pessoa: Pessoa) {
    this.pessoas.push(pessoa)
  }

  listar(): Pessoa[] {
    return this.pessoas
  }

  buscarPorId(id: number) {
    const pessoa = this.pessoas.find(elem => elem.id == id)
    
    return of(pessoa)
  }

  editar(pessoa: Pessoa) {
    const posArray = this.pessoas.findIndex(elem => elem.id === pessoa.id)

    if (posArray !== -1) {
      this.pessoas[posArray] = pessoa
    }
  }

  excluir(id: number) {
    this.pessoas = this.pessoas.filter(elem => elem.id !== id)
  }


}
