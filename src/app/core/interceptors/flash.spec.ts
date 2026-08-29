import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { AlertService } from "@core/services/alert.service";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { flashInterceptor } from "./flash";

describe("flashInterceptor", () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let alert: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([flashInterceptor])),
                provideHttpClientTesting(),
            ],
        });

        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        alert = TestBed.inject(AlertService);
    });

    it("surfaces an alert when a request fails to reach the server", () => {
        http.get("/api/v1/branches").subscribe({ error: () => {} });

        const req = httpMock.expectOne("/api/v1/branches");
        req.error(new ProgressEvent("error"), { status: 0, statusText: "Unknown Error" });

        httpMock.expectOne("/api/flash").flush({ data: null });

        expect(alert.current()?.message).toContain("No se pudo conectar con el servidor");
    });

    it("does not surface a connection alert for ordinary HTTP error responses", () => {
        http.get("/api/v1/branches").subscribe({ error: () => {} });

        const req = httpMock.expectOne("/api/v1/branches");
        req.flush({ detail: "Not found" }, { status: 404, statusText: "Not Found" });

        httpMock.expectOne("/api/flash").flush({ data: null });

        expect(alert.current()).toBeUndefined();
    });

    afterEach(() => {
        httpMock.verify();
    });
});
