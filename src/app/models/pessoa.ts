import { UF } from "./uf"
import { Municipio } from "./municipio"

export class Pessoa {
    id? : number
    nome?: string
    email?: string
    cpf? : string
    dataNascimento?: string
    uf?: UF
    municipio?: Municipio
}