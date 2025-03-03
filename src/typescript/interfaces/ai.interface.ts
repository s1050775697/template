export interface IGetThreadResponse {
  thread_id: string;
  created_at: string;
  updated_at: string;
  metadata: object;
  status: string;
  values: object;
}

export interface IThreadOk {
  thread_id: string;
  created_at: string;
  updated_at: string;
  metadata: object;
  status: string;
  values: object;
}

export interface IThreadBody {
  assistant_id: string;
  checkpoint: {
    thread_id: string;
    checkpoint_ns: string;
    checkpoint_id: string;
    checkpoint_map: Record<string, any>;
  };
  input: Record<string, any>;
  command: {
    update: Record<string, any>;
    resume: null;
    goto: {
      node: string;
      input: Record<string, any>;
    };
  };
  metadata: Record<string, any>;
  config: {
    tags: string[];
    recursion_limit: number;
    configurable: Record<string, any>;
  };
  webhook: string;
  interrupt_before: string;
  interrupt_after: string;
  stream_mode: string[];
  stream_subgraphs: boolean;
  on_disconnect: string;
  feedback_keys: string[];
  multitask_strategy: string;
  if_not_exists: string;
  after_seconds: number;
}

interface ITokenUsageDetails {
  accepted_prediction_tokens?: number;
  audio_tokens?: number;
  reasoning_tokens?: number;
  rejected_prediction_tokens?: number;
}

interface IPromptTokensDetails {
  audio_tokens?: number;
  cached_tokens?: number;
}

interface ITokenUsage {
  completion_tokens: number;
  prompt_tokens: number;
  total_tokens: number;
  completion_tokens_details?: ITokenUsageDetails;
  prompt_tokens_details?: IPromptTokensDetails;
}

interface IResponseMetadata {
  token_usage: ITokenUsage;
  model_name: string;
  system_fingerprint: string;
  finish_reason: string;
  logprobs: null;
}

interface IToolCall {
  // Define the structure of tool calls if needed
}

interface IInvalidToolCall {
  // Define the structure of invalid tool calls if needed
}

interface IInputTokenDetails {
  audio?: number;
  cache_read?: number;
}

interface IOutputTokenDetails {
  audio?: number;
  reasoning?: number;
}

interface IUsageMetadata {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  input_token_details?: IInputTokenDetails;
  output_token_details?: IOutputTokenDetails;
}

export interface IMessage {
  content: string;
  additional_kwargs: {
    refusal: null;
  };
  response_metadata: IResponseMetadata;
  type: "human" | "ai";
  name: null;
  id: string;
  example: boolean;
  tool_calls?: IToolCall[];
  invalid_tool_calls?: IInvalidToolCall[];
  usage_metadata?: IUsageMetadata;
}

interface IData {
  messages: IMessage[];
}

interface IEventData {
  event: "values"; 
  data: IData;
}
