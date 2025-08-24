import { Serializable } from "child_process";
import { ReadStream } from "fs";
import { APIResponse, request } from "playwright";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
    data?: string | Buffer | Serializable;
    failOnStatusCode?: boolean;
    form?: {
        [key: string]: string | number | boolean;
    } | FormData;
    headers?: {
        [key: string]: string;
    };
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    maxRetries?: number;
    method?: string;
    multipart?: FormData | {
        [key: string]: string | number | boolean | ReadStream | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        };
    };
    params?: Record<string, string | number | boolean> | URLSearchParams;
    //     [key: string]: string | number | boolean;
    // } | URLSearchParams | string;
    timeout?: number;
}

export interface ParseResponse<TResponse> {
    status: number,
    statusText: string,
    body: TResponse,
    headers: Record<string, string>
}

/**
 * This class contains common methods of all HTTP requests like GET, POST, PUT, DELETE, etc.
 * It can be extended by other controllers to inherit these methods.
 */
export class BaseController {
    private async sendRequest(method: RequestMethod, endPoint: string, requestOptions?: RequestOptions): Promise<APIResponse> {
        const requestContext = await request.newContext( {
            baseURL: 'https://petstore3.swagger.io'
        });
        
        const apiResponse = await requestContext.fetch('/api/v3/' + endPoint, {
            method,
            ...requestOptions
        });

        return apiResponse;
    }

    private async parseResponse<TResponse>(response: APIResponse): Promise<ParseResponse<TResponse>> {
        const contentType = response.headers()['content-type'] || '';
        let responseBody;

        if (contentType.includes('application/json')) {
          responseBody = await response.json();
        } else if (contentType.includes('text/plain')) {
          responseBody = await response.text();
        } else {
          throw new Error(`Unsupported content type: ${contentType}`);
        }

        return {
            status: response.status(),
            body: responseBody,
            headers: response.headers(),
            statusText: response.statusText()
        }
    }

    async get<TResponse>(endpoint: string, options?: RequestOptions): Promise<ParseResponse<TResponse>> {
        const response = await this.sendRequest('GET', endpoint, options);
        return this.parseResponse(response);
    }
    
    async post<TResponse>(endpoint: string, options?: RequestOptions): Promise<ParseResponse<TResponse>> {
        const response = await this.sendRequest('POST', endpoint, options);
        console.log(response.status());
        return this.parseResponse(response);
    }

       async delete<TResponse>(endpoint: string, options?: RequestOptions): Promise<ParseResponse<TResponse>> {
        const response = await this.sendRequest('DELETE', endpoint, options);
        return this.parseResponse(response);
    }

     async put<TResponse>(endpoint: string, options?: RequestOptions): Promise<ParseResponse<TResponse>> {
        const response = await this.sendRequest('PUT', endpoint, options);
        return this.parseResponse(response);
    }
}
