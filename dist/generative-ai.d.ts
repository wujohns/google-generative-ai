/**
 * Base parameters for a number of methods.
 * @public
 */
export declare interface BaseParams {
    safetySettings?: SafetySetting[];
    generationConfig?: GenerationConfig;
}

/**
 * Params for calling  {@link GenerativeModel.batchEmbedContents}
 * @public
 */
export declare interface BatchEmbedContentsRequest {
    requests: EmbedContentRequest[];
}

/**
 * Response from calling {@link GenerativeModel.batchEmbedContents}.
 * @public
 */
export declare interface BatchEmbedContentsResponse {
    embeddings: ContentEmbedding[];
}

/**
 * Reason that a prompt was blocked.
 * @public
 */
export declare enum BlockReason {
    BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED",
    SAFETY = "SAFETY",
    OTHER = "OTHER"
}

/**
 * Describes `CachedContent` interface for sending to the server (if creating)
 * or received from the server (using getters or list methods).
 * @public
 */
export declare interface CachedContent extends CachedContentBase {
    name?: string;
    /**
     * protobuf.Duration format (ex. "3.0001s").
     */
    ttl?: string;
    /**
     * `CachedContent` creation time in ISO string format.
     */
    createTime?: string;
    /**
     * `CachedContent` update time in ISO string format.
     */
    updateTime?: string;
}

/**
 * @public
 */
export declare interface CachedContentBase {
    model?: string;
    contents: Content[];
    tools?: Tool[];
    toolConfig?: ToolConfig;
    systemInstruction?: string | Part | Content;
    /**
     * Expiration time in ISO string format. Specify either this or `ttlSeconds`
     * when creating a `CachedContent`.
     */
    expireTime?: string;
    displayName?: string;
}

/**
 * ChatSession class that enables sending chat messages and stores
 * history of sent and received messages so far.
 *
 * @public
 */
export declare class ChatSession {
    model: string;
    params?: StartChatParams;
    requestOptions?: RequestOptions;
    private _apiKey;
    private _history;
    private _sendPromise;
    constructor(apiKey: string, model: string, params?: StartChatParams, requestOptions?: RequestOptions);
    /**
     * Gets the chat history so far. Blocked prompts are not added to history.
     * Blocked candidates are not added to history, nor are the prompts that
     * generated them.
     */
    getHistory(): Promise<Content[]>;
    /**
     * Sends a chat message and receives a non-streaming
     * {@link GenerateContentResult}
     */
    sendMessage(request: string | Array<string | Part>): Promise<GenerateContentResult>;
    /**
     * Sends a chat message and receives the response as a
     * {@link GenerateContentStreamResult} containing an iterable stream
     * and a response promise.
     */
    sendMessageStream(request: string | Array<string | Part>): Promise<GenerateContentStreamResult>;
}

/**
 * Citation metadata that may be found on a {@link GenerateContentCandidate}.
 * @public
 */
export declare interface CitationMetadata {
    citationSources: CitationSource[];
}

/**
 * A single citation source.
 * @public
 */
export declare interface CitationSource {
    startIndex?: number;
    endIndex?: number;
    uri?: string;
    license?: string;
}

/**
 * Content type for both prompts and response candidates.
 * @public
 */
export declare interface Content {
    role: string;
    parts: Part[];
}

/**
 * A single content embedding.
 * @public
 */
export declare interface ContentEmbedding {
    values: number[];
}

/**
 * Params for calling {@link GenerativeModel.countTokens}.
 *
 * The request must contain either a {@link Content} array or a
 * {@link GenerateContentRequest}, but not both. If both are provided
 * then a {@link GoogleGenerativeAIRequestInputError} is thrown.
 *
 * @public
 */
export declare interface CountTokensRequest {
    generateContentRequest?: GenerateContentRequest;
    contents?: Content[];
}

/**
 * Params for calling {@link GenerativeModel.countTokens}
 * @internal
 */
export declare interface CountTokensRequestInternal {
    generateContentRequest?: GenerateContentRequestInternal;
    contents?: Content[];
}

/**
 * Response from calling {@link GenerativeModel.countTokens}.
 * @public
 */
export declare interface CountTokensResponse {
    totalTokens: number;
}

/**
 * Params for calling {@link GenerativeModel.embedContent}
 * @public
 */
export declare interface EmbedContentRequest {
    content: Content;
    taskType?: TaskType;
    title?: string;
}

/**
 * Response from calling {@link GenerativeModel.embedContent}.
 * @public
 */
export declare interface EmbedContentResponse {
    embedding: ContentEmbedding;
}

/**
 * Response object wrapped with helper methods.
 *
 * @public
 */
export declare interface EnhancedGenerateContentResponse extends GenerateContentResponse {
    /**
     * Returns the text string assembled from all `Part`s of the first candidate
     * of the response, if available.
     * Throws if the prompt or candidate was blocked.
     */
    text: () => string;
    /**
     * Deprecated: use `functionCalls()` instead.
     * @deprecated - use `functionCalls()` instead
     */
    functionCall: () => FunctionCall | undefined;
    /**
     * Returns function calls found in any `Part`s of the first candidate
     * of the response, if available.
     * Throws if the prompt or candidate was blocked.
     */
    functionCalls: () => FunctionCall[] | undefined;
}

/**
 * Details object that may be included in an error response.
 * @public
 */
export declare interface ErrorDetails {
    "@type"?: string;
    reason?: string;
    domain?: string;
    metadata?: Record<string, unknown>;
    [key: string]: unknown;
}

/**
 * Data pointing to a file uploaded with the Files API.
 * @public
 */
export declare interface FileData {
    mimeType: string;
    fileUri: string;
}

/**
 * Content part interface if the part represents FunctionResponse.
 * @public
 */
export declare interface FileDataPart {
    text?: never;
    inlineData?: never;
    functionCall?: never;
    functionResponse?: never;
    fileData: FileData;
}

/**
 * Reason that a candidate finished.
 * @public
 */
export declare enum FinishReason {
    FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED",
    STOP = "STOP",
    MAX_TOKENS = "MAX_TOKENS",
    SAFETY = "SAFETY",
    RECITATION = "RECITATION",
    OTHER = "OTHER"
}

/**
 * A predicted [FunctionCall] returned from the model
 * that contains a string representing the [FunctionDeclaration.name]
 * and a structured JSON object containing the parameters and their values.
 * @public
 */
export declare interface FunctionCall {
    name: string;
    args: object;
}

/**
 * @public
 */
export declare interface FunctionCallingConfig {
    mode?: FunctionCallingMode;
    allowedFunctionNames?: string[];
}

/**
 * @public
 */
export declare enum FunctionCallingMode {
    MODE_UNSPECIFIED = "MODE_UNSPECIFIED",
    AUTO = "AUTO",
    ANY = "ANY",
    NONE = "NONE"
}

/**
 * Content part interface if the part represents FunctionResponse.
 * @public
 */
export declare interface FunctionCallPart {
    text?: never;
    inlineData?: never;
    functionCall: FunctionCall;
    functionResponse?: never;
    fileData?: never;
}

/**
 * Structured representation of a function declaration as defined by the
 * [OpenAPI 3.0 specification](https://spec.openapis.org/oas/v3.0.3). Included
 * in this declaration are the function name and parameters. This
 * FunctionDeclaration is a representation of a block of code that can be used
 * as a Tool by the model and executed by the client.
 * @public
 */
export declare interface FunctionDeclaration {
    /**
     * The name of the function to call. Must start with a letter or an
     * underscore. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with
     * a max length of 64.
     */
    name: string;
    /**
     * Optional. Description and purpose of the function. Model uses it to decide
     * how and whether to call the function.
     */
    description?: string;
    /**
     * Optional. Describes the parameters to this function in JSON Schema Object
     * format. Reflects the Open API 3.03 Parameter Object. string Key: the name
     * of the parameter. Parameter names are case sensitive. Schema Value: the
     * Schema defining the type used for the parameter. For function with no
     * parameters, this can be left unset.
     *
     * @example with 1 required and 1 optional parameter: type: OBJECT properties:
     * ```
     * param1:
     *
     *   type: STRING
     * param2:
     *
     *  type: INTEGER
     * required:
     *
     *   - param1
     * ```
     */
    parameters?: FunctionDeclarationSchema;
}

/**
 * Schema for parameters passed to {@link FunctionDeclaration.parameters}.
 * @public
 */
export declare interface FunctionDeclarationSchema {
    /** The type of the parameter. */
    type: FunctionDeclarationSchemaType;
    /** The format of the parameter. */
    properties: {
        [k: string]: FunctionDeclarationSchemaProperty;
    };
    /** Optional. Description of the parameter. */
    description?: string;
    /** Optional. Array of required parameters. */
    required?: string[];
}

/**
 * Schema for top-level function declaration
 * @public
 */
export declare interface FunctionDeclarationSchemaProperty extends Schema {
}

/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 * @public
 */
export declare enum FunctionDeclarationSchemaType {
    /** String type. */
    STRING = "STRING",
    /** Number type. */
    NUMBER = "NUMBER",
    /** Integer type. */
    INTEGER = "INTEGER",
    /** Boolean type. */
    BOOLEAN = "BOOLEAN",
    /** Array type. */
    ARRAY = "ARRAY",
    /** Object type. */
    OBJECT = "OBJECT"
}

/**
 * A FunctionDeclarationsTool is a piece of code that enables the system to
 * interact with external systems to perform an action, or set of actions,
 * outside of knowledge and scope of the model.
 * @public
 */
export declare interface FunctionDeclarationsTool {
    /**
     * Optional. One or more function declarations
     * to be passed to the model along with the current user query. Model may
     * decide to call a subset of these functions by populating
     * [FunctionCall][content.part.functionCall] in the response. User should
     * provide a [FunctionResponse][content.part.functionResponse] for each
     * function call in the next turn. Based on the function responses, Model will
     * generate the final response back to the user. Maximum 64 function
     * declarations can be provided.
     */
    functionDeclarations?: FunctionDeclaration[];
}

/**
 * The result output from a [FunctionCall] that contains a string
 * representing the [FunctionDeclaration.name]
 * and a structured JSON object containing any output
 * from the function is used as context to the model.
 * This should contain the result of a [FunctionCall]
 * made based on model prediction.
 * @public
 */
export declare interface FunctionResponse {
    name: string;
    response: object;
}

/**
 * Content part interface if the part represents FunctionResponse.
 * @public
 */
export declare interface FunctionResponsePart {
    text?: never;
    inlineData?: never;
    functionCall?: never;
    functionResponse: FunctionResponse;
    fileData?: never;
}

/**
 * A candidate returned as part of a {@link GenerateContentResponse}.
 * @public
 */
export declare interface GenerateContentCandidate {
    index: number;
    content: Content;
    finishReason?: FinishReason;
    finishMessage?: string;
    safetyRatings?: SafetyRating[];
    citationMetadata?: CitationMetadata;
}

/**
 * Request sent to `generateContent` endpoint.
 * @public
 */
export declare interface GenerateContentRequest extends BaseParams {
    contents: Content[];
    tools?: Tool[];
    toolConfig?: ToolConfig;
    systemInstruction?: string | Part | Content;
    /**
     * This is the name of a `CachedContent` and not the cache object itself.
     */
    cachedContent?: string;
}

/**
 * Request sent to `generateContent` endpoint.
 * @internal
 */
export declare interface GenerateContentRequestInternal extends GenerateContentRequest {
    model?: string;
}

/**
 * Individual response from {@link GenerativeModel.generateContent} and
 * {@link GenerativeModel.generateContentStream}.
 * `generateContentStream()` will return one in each chunk until
 * the stream is done.
 * @public
 */
export declare interface GenerateContentResponse {
    /** Candidate responses from the model. */
    candidates?: GenerateContentCandidate[];
    /** The prompt's feedback related to the content filters. */
    promptFeedback?: PromptFeedback;
    /** Metadata on the generation request's token usage. */
    usageMetadata?: UsageMetadata;
}

/**
 * Result object returned from generateContent() call.
 *
 * @public
 */
export declare interface GenerateContentResult {
    response: EnhancedGenerateContentResponse;
}

/**
 * Result object returned from generateContentStream() call.
 * Iterate over `stream` to get chunks as they come in and/or
 * use the `response` promise to get the aggregated response when
 * the stream is done.
 *
 * @public
 */
export declare interface GenerateContentStreamResult {
    stream: AsyncGenerator<EnhancedGenerateContentResponse>;
    response: Promise<EnhancedGenerateContentResponse>;
}

/**
 * Config options for content-related requests
 * @public
 */
export declare interface GenerationConfig {
    candidateCount?: number;
    stopSequences?: string[];
    maxOutputTokens?: number;
    temperature?: number;
    topP?: number;
    topK?: number;
    /**
     * Output response mimetype of the generated candidate text.
     * Supported mimetype:
     *   `text/plain`: (default) Text output.
     *   `application/json`: JSON response in the candidates.
     */
    responseMimeType?: string;
    /**
     * Output response schema of the generated candidate text.
     * Note: This only applies when the specified `responseMIMEType` supports a schema; currently
     * this is limited to `application/json`.
     */
    responseSchema?: ResponseSchema;
}

/**
 * Interface for sending an image.
 * @public
 */
export declare interface GenerativeContentBlob {
    mimeType: string;
    /**
     * Image as a base64 string.
     */
    data: string;
}

/**
 * Class for generative model APIs.
 * @public
 */
export declare class GenerativeModel {
    apiKey: string;
    model: string;
    generationConfig: GenerationConfig;
    safetySettings: SafetySetting[];
    requestOptions: RequestOptions;
    tools?: Tool[];
    toolConfig?: ToolConfig;
    systemInstruction?: Content;
    cachedContent: CachedContent;
    constructor(apiKey: string, modelParams: ModelParams, requestOptions?: RequestOptions);
    /**
     * Makes a single non-streaming call to the model
     * and returns an object containing a single {@link GenerateContentResponse}.
     */
    generateContent(request: GenerateContentRequest | string | Array<string | Part>): Promise<GenerateContentResult>;
    /**
     * Makes a single streaming call to the model
     * and returns an object containing an iterable stream that iterates
     * over all chunks in the streaming response as well as
     * a promise that returns the final aggregated response.
     */
    generateContentStream(request: GenerateContentRequest | string | Array<string | Part>): Promise<GenerateContentStreamResult>;
    /**
     * Gets a new {@link ChatSession} instance which can be used for
     * multi-turn chats.
     */
    startChat(startChatParams?: StartChatParams): ChatSession;
    /**
     * Counts the tokens in the provided request.
     */
    countTokens(request: CountTokensRequest | string | Array<string | Part>): Promise<CountTokensResponse>;
    /**
     * Embeds the provided content.
     */
    embedContent(request: EmbedContentRequest | string | Array<string | Part>): Promise<EmbedContentResponse>;
    /**
     * Embeds an array of {@link EmbedContentRequest}s.
     */
    batchEmbedContents(batchEmbedContentRequest: BatchEmbedContentsRequest): Promise<BatchEmbedContentsResponse>;
}

/**
 * Top-level class for this SDK
 * @public
 */
export declare class GoogleGenerativeAI {
    apiKey: string;
    constructor(apiKey: string);
    /**
     * Gets a {@link GenerativeModel} instance for the provided model name.
     */
    getGenerativeModel(modelParams: ModelParams, requestOptions?: RequestOptions): GenerativeModel;
    /**
     * Creates a {@link GenerativeModel} instance from provided content cache.
     */
    getGenerativeModelFromCachedContent(cachedContent: CachedContent, requestOptions?: RequestOptions): GenerativeModel;
}

/**
 * Basic error type for this SDK.
 * @public
 */
export declare class GoogleGenerativeAIError extends Error {
    constructor(message: string);
}

/**
 * Error class covering HTTP errors when calling the server. Includes HTTP
 * status, statusText, and optional details, if provided in the server response.
 * @public
 */
export declare class GoogleGenerativeAIFetchError extends GoogleGenerativeAIError {
    status?: number;
    statusText?: string;
    errorDetails?: ErrorDetails[];
    constructor(message: string, status?: number, statusText?: string, errorDetails?: ErrorDetails[]);
}

/**
 * Errors in the contents of a request originating from user input.
 * @public
 */
export declare class GoogleGenerativeAIRequestInputError extends GoogleGenerativeAIError {
}

/**
 * Errors in the contents of a response from the model. This includes parsing
 * errors, or responses including a safety block reason.
 * @public
 */
export declare class GoogleGenerativeAIResponseError<T> extends GoogleGenerativeAIError {
    response?: T;
    constructor(message: string, response?: T);
}

/**
 * Threshold above which a prompt or candidate will be blocked.
 * @public
 */
export declare enum HarmBlockThreshold {
    HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
    BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
    BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
    BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
    BLOCK_NONE = "BLOCK_NONE"
}

/**
 * Harm categories that would cause prompts or candidates to be blocked.
 * @public
 */
export declare enum HarmCategory {
    HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED",
    HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH",
    HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT",
    HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT"
}

/**
 * Probability that a prompt or candidate matches a harm category.
 * @public
 */
export declare enum HarmProbability {
    HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED",
    NEGLIGIBLE = "NEGLIGIBLE",
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

/**
 * Content part interface if the part represents an image.
 * @public
 */
export declare interface InlineDataPart {
    text?: never;
    inlineData: GenerativeContentBlob;
    functionCall?: never;
    functionResponse?: never;
    fileData?: never;
}

/**
 * Params passed to {@link GoogleGenerativeAI.getGenerativeModel}.
 * @public
 */
export declare interface ModelParams extends BaseParams {
    model: string;
    tools?: Tool[];
    toolConfig?: ToolConfig;
    systemInstruction?: string | Part | Content;
    cachedContent?: CachedContent;
}

/**
 * Content part - includes text or image part types.
 * @public
 */
export declare type Part = TextPart | InlineDataPart | FunctionCallPart | FunctionResponsePart | FileDataPart;

/**
 * Possible roles.
 * @public
 */
export declare const POSSIBLE_ROLES: readonly ["user", "model", "function", "system"];

/**
 * If the prompt was blocked, this will be populated with `blockReason` and
 * the relevant `safetyRatings`.
 * @public
 */
export declare interface PromptFeedback {
    blockReason: BlockReason;
    safetyRatings: SafetyRating[];
    blockReasonMessage?: string;
}

/**
 * Params passed to getGenerativeModel() or GoogleAIFileManager().
 * @public
 */
export declare interface RequestOptions {
    /**
     * Request timeout in milliseconds.
     */
    timeout?: number;
    /**
     * Version of API endpoint to call (e.g. "v1" or "v1beta"). If not specified,
     * defaults to latest stable version.
     */
    apiVersion?: string;
    /**
     * Additional attribution information to include in the x-goog-api-client header.
     * Used by wrapper SDKs.
     */
    apiClient?: string;
    /**
     * Base endpoint url. Defaults to "https://generativelanguage.googleapis.com"
     */
    baseUrl?: string;
    /**
     * Custom HTTP request headers.
     */
    customHeaders?: Headers | Record<string, string>;
    /**
     * dispatcher
     * const { ProxyAgent } = require('undici')
     * const dispatcher = new ProxyAgent('http://127.0.0.1:7890')
     */
    dispatcher?: any;
}

/**
 * Schema passed to `GenerationConfig.responseSchema`
 * @public
 */
export declare interface ResponseSchema extends Schema {
}

/**
 * A safety rating associated with a {@link GenerateContentCandidate}
 * @public
 */
export declare interface SafetyRating {
    category: HarmCategory;
    probability: HarmProbability;
}

/**
 * Safety setting that can be sent as part of request parameters.
 * @public
 */
export declare interface SafetySetting {
    category: HarmCategory;
    threshold: HarmBlockThreshold;
}

/**
 * Schema is used to define the format of input/output data.
 * Represents a select subset of an OpenAPI 3.0 schema object.
 * More fields may be added in the future as needed.
 * @public
 */
export declare interface Schema {
    /**
     * Optional. The type of the property. {@link
     * FunctionDeclarationSchemaType}.
     */
    type?: FunctionDeclarationSchemaType;
    /** Optional. The format of the property. */
    format?: string;
    /** Optional. The description of the property. */
    description?: string;
    /** Optional. Whether the property is nullable. */
    nullable?: boolean;
    /** Optional. The items of the property. {@link FunctionDeclarationSchema} */
    items?: FunctionDeclarationSchema;
    /** Optional. The enum of the property. */
    enum?: string[];
    /** Optional. Map of {@link FunctionDeclarationSchema}. */
    properties?: {
        [k: string]: FunctionDeclarationSchema;
    };
    /** Optional. Array of required property. */
    required?: string[];
    /** Optional. The example of the property. */
    example?: unknown;
}

/**
 * Params for {@link GenerativeModel.startChat}.
 * @public
 */
export declare interface StartChatParams extends BaseParams {
    history?: Content[];
    tools?: Tool[];
    toolConfig?: ToolConfig;
    systemInstruction?: string | Part | Content;
    /**
     * This is the name of a `CachedContent` and not the cache object itself.
     */
    cachedContent?: string;
}

/**
 * Task type for embedding content.
 * @public
 */
export declare enum TaskType {
    TASK_TYPE_UNSPECIFIED = "TASK_TYPE_UNSPECIFIED",
    RETRIEVAL_QUERY = "RETRIEVAL_QUERY",
    RETRIEVAL_DOCUMENT = "RETRIEVAL_DOCUMENT",
    SEMANTIC_SIMILARITY = "SEMANTIC_SIMILARITY",
    CLASSIFICATION = "CLASSIFICATION",
    CLUSTERING = "CLUSTERING"
}

/**
 * Content part interface if the part represents a text string.
 * @public
 */
export declare interface TextPart {
    text: string;
    inlineData?: never;
    functionCall?: never;
    functionResponse?: never;
    fileData?: never;
}

/**
 * Defines a tool that model can call to access external knowledge.
 * @public
 */
export declare type Tool = FunctionDeclarationsTool;

/**
 * Tool config. This config is shared for all tools provided in the request.
 * @public
 */
export declare interface ToolConfig {
    functionCallingConfig: FunctionCallingConfig;
}

/**
 * Metadata on the generation request's token usage.
 * @public
 */
export declare interface UsageMetadata {
    /** Number of tokens in the prompt. */
    promptTokenCount: number;
    /** Total number of tokens across the generated candidates. */
    candidatesTokenCount: number;
    /** Total token count for the generation request (prompt + candidates). */
    totalTokenCount: number;
}

export { }
