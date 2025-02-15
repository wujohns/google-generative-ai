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
 * Params to pass to {@link GoogleAICacheManager.create}.
 * @public
 */
export declare interface CachedContentCreateParams extends CachedContentBase {
    /**
     * `CachedContent` ttl in seconds. Specify either this or `expireTime`
     * when creating a `CachedContent`.
     */
    ttlSeconds?: number;
}

/**
 * Fields that can be updated in an existing content cache.
 * @public
 */
export declare interface CachedContentUpdateInputFields {
    ttlSeconds?: number;
    expireTime?: string;
}

/**
 * Params to pass to {@link GoogleAICacheManager.update}.
 * @public
 */
export declare interface CachedContentUpdateParams {
    cachedContent: CachedContentUpdateInputFields;
    /**
     * protobuf FieldMask. If not specified, updates all provided fields.
     */
    updateMask?: string[];
}

/**
 * Params as sent to the backend (ttl instead of ttlSeconds).
 * @internal
 */
export declare interface CachedContentUpdateRequest {
    cachedContent: CachedContentUpdateRequestFields;
    /**
     * protobuf FieldMask
     */
    updateMask?: string[];
}

/**
 * Fields that can be updated in an existing content cache.
 * @internal
 */
export declare interface CachedContentUpdateRequestFields {
    ttl?: string;
    expireTime?: string;
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
 * Metadata to provide alongside a file upload
 * @public
 */
export declare interface FileMetadata {
    name?: string;
    displayName?: string;
    mimeType: string;
}

/**
 * File metadata response from server.
 * @public
 */
export declare interface FileMetadataResponse {
    name: string;
    displayName?: string;
    mimeType: string;
    sizeBytes: string;
    createTime: string;
    updateTime: string;
    expirationTime: string;
    sha256Hash: string;
    uri: string;
    state: FileState;
    /**
     * Error populated if file processing has failed.
     */
    error?: RpcStatus;
    /**
     * Video metadata populated after processing is complete.
     */
    videoMetadata?: VideoMetadata;
}

/**
 * Processing state of the `File`.
 * @public
 */
export declare enum FileState {
    STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
    PROCESSING = "PROCESSING",
    ACTIVE = "ACTIVE",
    FAILED = "FAILED"
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
 * Class for managing GoogleAI content caches.
 * @public
 */
export declare class GoogleAICacheManager {
    apiKey: string;
    private _requestOptions?;
    constructor(apiKey: string, _requestOptions?: RequestOptions);
    /**
     * Upload a new content cache
     */
    create(createOptions: CachedContentCreateParams): Promise<CachedContent>;
    /**
     * List all uploaded content caches
     */
    list(listParams?: ListParams): Promise<ListCacheResponse>;
    /**
     * Get a content cache
     */
    get(name: string): Promise<CachedContent>;
    /**
     * Update an existing content cache
     */
    update(name: string, updateParams: CachedContentUpdateParams): Promise<CachedContent>;
    /**
     * Delete content cache with given name
     */
    delete(name: string): Promise<void>;
}

/**
 * Class for managing GoogleAI file uploads.
 * @public
 */
export declare class GoogleAIFileManager {
    apiKey: string;
    private _requestOptions?;
    constructor(apiKey: string, _requestOptions?: RequestOptions);
    /**
     * Upload a file
     */
    uploadFile(filePath: string, fileMetadata: FileMetadata): Promise<UploadFileResponse>;
    /**
     * List all uploaded files
     */
    listFiles(listParams?: ListParams): Promise<ListFilesResponse>;
    /**
     * Get metadata for file with given ID
     */
    getFile(fileId: string): Promise<FileMetadataResponse>;
    /**
     * Delete file with given ID
     */
    deleteFile(fileId: string): Promise<void>;
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
 * @public
 */
export declare interface ListCacheResponse {
    cachedContents: CachedContent[];
    nextPageToken?: string;
}

/**
 * Response from calling {@link GoogleAIFileManager.listFiles}
 * @public
 */
export declare interface ListFilesResponse {
    files: FileMetadataResponse[];
    nextPageToken?: string;
}

/**
 * Params to pass to {@link GoogleAIFileManager.listFiles} or
 * {@link GoogleAICacheManager.list}
 * @public
 */
export declare interface ListParams {
    pageSize?: number;
    pageToken?: string;
}

/**
 * Content part - includes text or image part types.
 * @public
 */
export declare type Part = TextPart | InlineDataPart | FunctionCallPart | FunctionResponsePart | FileDataPart;

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
}

/**
 * Schema passed to `GenerationConfig.responseSchema`
 * @public
 */
export declare interface ResponseSchema extends Schema {
}

/**
 * Standard RPC error status object.
 * @public
 */
export declare interface RpcStatus {
    /**
     * Error status code
     */
    code: number;
    /**
     * A developer-facing error message.
     */
    message: string;
    /**
     * A list of messages that carry the error details.
     */
    details?: ErrorDetails[];
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
 * Response from calling {@link GoogleAIFileManager.uploadFile}
 * @public
 */
export declare interface UploadFileResponse {
    file: FileMetadataResponse;
}

/**
 * Metadata populated when video has been processed.
 * @public
 */
export declare interface VideoMetadata {
    /**
     * The video duration in
     * protobuf {@link https://cloud.google.com/ruby/docs/reference/google-cloud-workflows-v1/latest/Google-Protobuf-Duration#json-mapping | Duration} format.
     */
    videoDuration: string;
}

export { }
