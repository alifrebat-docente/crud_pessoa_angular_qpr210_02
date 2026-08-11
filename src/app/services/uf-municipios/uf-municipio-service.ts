import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UF } from '../../models/uf';
import { Municipio } from '../../models/municipio';

@Injectable({
  providedIn: 'root',
})
export class UfMunicipioService {

  constructor(private http: HttpClient) { }

  listarUF(): Observable<UF[]> {
    //const urlApi = `https://brasilapi.com.br/api/ibge/uf/v1`
    const urlApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    return this.http.get<UF[]>(urlApi)
  }

  listarMunicipios(uf: string): Observable<Municipio[]> {
    const urlApi = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`
    return this.http.get<Municipio[]>(urlApi)

  }

  listarMunicipiosIBGE(idUf: number): Observable<Municipio[]> {
    const urlApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`

    return this.http.get<Municipio[]>(urlApi)

  }


}
