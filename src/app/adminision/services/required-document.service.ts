import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Auth } from '../../shared/auth';

@Injectable({
  providedIn: 'root'
})
export class RequiredDocumentService {

  public static REQUIRED_DOCUMENT_SERVICE_PREFIX = 'required_document';

  constructor(private http: HttpClient) {
  }

  /**
   * get services from api
   *
   */
  public get() {
    return this.http.get('adminision/required_documents?api_token=' + Auth.getApiToken());
  }

  /**
   * store new service
   */
  public store(data: any) { 
    return this.http.post('adminision/required_documents/store' + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * update service
   */
  public update(data: any) { 
    return this.http.post('adminision/required_documents/update/' + data.id + '?api_token=' + Auth.getApiToken(), data);
  }

  /**
   * remove service
   */
  public destroy(id) { 
    return this.http.post('adminision/required_documents/delete/' + id + '?api_token=' + Auth.getApiToken(), null);
  }
}
