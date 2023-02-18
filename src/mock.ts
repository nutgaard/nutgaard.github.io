import FetchMock, { MiddlewareUtils } from "yet-another-fetch-mock";
// @ts-ignore
import data from "./mockdata.json";

const mock = FetchMock.configure({
    enableFallback: false,
    middleware: MiddlewareUtils.loggingMiddleware()
});

function paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    // Calculate the start and end index of the page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Return the subarray of the array that corresponds to the page
    return array.slice(startIndex, endIndex);
}

mock.get("https://api.github.com/users/nutgaard/repos", (req, res, ctx) => {
    const perPage = req.queryParams['per_page'];
    const page = req.queryParams['page'];

    return res(
        ctx.delay(0),
        ctx.json(paginate(data, perPage, page))
    );
});