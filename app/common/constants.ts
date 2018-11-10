export class Constants {
    public static readonly APP_MODULE_NAME = 'hackerApp';
    public static readonly HACKERRANK_SERVICE_URL = 'https://hacker-news.firebaseio.com/v0/';
    public static readonly TOP_STORIES = 'topstories.json';
    public static readonly JSON_RESPONSE = '.json';

    public static readonly CONTENT_TYPE = 'Content-Type';
    public static readonly APPLICATION_JSON_TYPE = 'application/json';

    public static readonly TOP_ITEMS_URL = (requestType: string) => `${Constants.HACKERRANK_SERVICE_URL}${requestType}`;
    public static readonly GET_ITEMS_URL = (itemId: number) => `${Constants.HACKERRANK_SERVICE_URL}item/${itemId}${Constants.JSON_RESPONSE}`;
}
