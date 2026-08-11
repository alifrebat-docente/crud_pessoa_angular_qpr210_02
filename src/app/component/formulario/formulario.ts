import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa/pessoa-service';
import { Pessoa } from '../../models/pessoa';
import { ActivatedRoute } from '@angular/router';
import { UfMunicipioService } from '../../services/uf-municipios/uf-municipio-service';
import { UF } from '../../models/uf';
import { Municipio } from '../../models/municipio';


@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  nome = ''
  email = ''
  cpf = ''
  dataNascimento = ''
  uf?: UF;
  municipio?: Municipio;
  ufs: UF[] = []
  municipios: Municipio[] = [];

  idPessoaEdit = 0 //ARMENGUE LEGAL
  edit = false

  constructor(private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private ufMunicipioService: UfMunicipioService
  ) { }

  limpaAtributos() {
    this.nome = ''
    this.email = ''
    this.cpf = ''
    this.dataNascimento = ''
    this.uf = undefined;
    this.municipio = undefined;
    this.ufs = [];
    this.municipios = [];
  }

  carregaAtributos(pessoa: Pessoa) {
    this.nome = String(pessoa.nome)
    this.email = String(pessoa.email)
    this.cpf = String(pessoa.cpf)
    this.dataNascimento = String(pessoa.dataNascimento)
    this.uf = pessoa.uf
    this.municipio  = pessoa.municipio
  }

  ngOnInit() {
    const idPessoa = this.route.snapshot.paramMap.get('id')

    this.idPessoaEdit = Number(idPessoa)

    if (idPessoa) {
      this.edit = true

      //OBSERVABLES
      this.pessoaService.buscarPorId(Number(idPessoa))
        .subscribe(objPessoa => {
          if (objPessoa) {
            this.carregaAtributos({ ...objPessoa })
          }
        })
    }

    this.carregarUf()
  }

  save() {

    const pessoa = new Pessoa()
    pessoa.nome = this.nome
    pessoa.email = this.email
    pessoa.cpf = this.cpf
    pessoa.dataNascimento = this.dataNascimento
    pessoa.uf = this.uf
    pessoa.municipio = this.municipio

    if (this.edit) {
      pessoa.id = this.idPessoaEdit
      this.pessoaService.editar(pessoa)
      this.edit = false
    } else {
      pessoa.id = this.pessoaService.tamanhoArray() + 1, //ARMENGUE PARA GERAR ID

        this.pessoaService.adicionar(
          pessoa
          /*{
          id: this.pessoaService.tamanhoArray() + 1, //ARMENGUE PARA GERAR ID
          nome: this.nome,
          cpf: this.cpf,
          email: this.email,
          dataNascimento: this.dataNascimento
        }*/

        )
    }


    this.limpaAtributos()
  }

  alterar(pessoa: Pessoa) {
    if (confirm("Tem certeza que deseja Excluir a Pessoa?")) {
      this.pessoaService.editar(pessoa)
    }
  }

  carregarUf() {
    //console.time('API - UFs');

    this.ufMunicipioService.listarUF()
      .subscribe({
        next: (dadosUf) => {
          //this.ufs = dadosUf
          this.ufs = [...dadosUf].sort((a, b) => a.nome.localeCompare(b.nome))
          // console.table(this.ufs)
        },
        error: (msgErro) => {
          console.log('Erro ao listar UFs: ', msgErro)
        }

      })
  }

  carregarMunicipios() {
    // Se nenhuma UF estiver selecionada,
    // limpa os municípios
    if (!this.uf) {
      this.municipios = [];
      this.municipio = undefined;

      return;
    }

     //console.time('API - Municípios');

    //this.ufMunicipioService.listarMunicipios(this.uf.sigla)
    this.ufMunicipioService.listarMunicipiosIBGE(this.uf.id)
      .subscribe({
        next: (dados) => {
          this.municipios = dados;
          //this.municipio = '';
          // console.table(this.municipios);
        },
        error: (erro) => {
          console.error('Erro ao carregar municípios:', erro);
          this.municipios = [];
        }
      });

  }

}
