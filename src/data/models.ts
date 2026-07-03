import { ModelPricing } from '../types/pricing'

export const modelPricingData: ModelPricing[] = [
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'DeepSeek',
    providerColor: '#3B82F6',
    inputPrice: 1,
    outputPrice: 2,
    cacheHitPrice: 0.02,
    cacheMissPrice: 1,
    contextWindow: 128000,
    features: ['极速响应', '高性价比', '支持缓存'],
    description: '适合高频低精度场景，缓存策略可大幅降低成本'
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    providerColor: '#3B82F6',
    inputPrice: 3,
    outputPrice: 6,
    cacheHitPrice: 0.025,
    cacheMissPrice: 3,
    contextWindow: 128000,
    features: ['高性能', '支持缓存', '复杂推理'],
    description: '平衡性能与成本，适合中等复杂度任务'
  },
  {
    id: 'doubao-seed-mini',
    name: '豆包 Seed 2.0 Mini',
    provider: '字节跳动',
    providerColor: '#10B981',
    inputPrice: 0.2,
    outputPrice: 2,
    cacheHitPrice: 0.04,
    contextWindow: 128000,
    features: ['轻量级', '免费额度', '中文优化'],
    description: '轻量级模型，适合简单问答和内容生成'
  },
  {
    id: 'doubao-seed-pro',
    name: '豆包 Seed 2.0 Pro',
    provider: '字节跳动',
    providerColor: '#10B981',
    inputPrice: 3.2,
    outputPrice: 16,
    cacheHitPrice: 0.64,
    contextWindow: 256000,
    features: ['多模态', '长上下文', 'Agent开发'],
    description: '适合复杂任务、多模态处理和Agent开发'
  },
  {
    id: 'qwen-3.6-flash',
    name: 'Qwen 3.6 Flash',
    provider: '阿里云',
    providerColor: '#F59E0B',
    inputPrice: 1.2,
    outputPrice: 7.2,
    contextWindow: 256000,
    features: ['超长上下文', '阿里云生态'],
    description: '超长上下文支持，适合长文档处理'
  },
  {
    id: 'qwen-3.7-max',
    name: 'Qwen 3.7 Max',
    provider: '阿里云',
    providerColor: '#F59E0B',
    inputPrice: 12,
    outputPrice: 36,
    contextWindow: 1000000,
    features: ['旗舰推理', '百万上下文', '企业级'],
    description: '顶级推理能力，适合高复杂度任务'
  },
  {
    id: 'glm-4-air',
    name: 'GLM-4 Air',
    provider: '智谱AI',
    providerColor: '#8B5CF6',
    inputPrice: 0.8,
    outputPrice: 2,
    cacheHitPrice: 0.16,
    contextWindow: 128000,
    features: ['免费额度', '入门首选', '中文优秀'],
    description: 'GLM-4-Flash完全免费，Air版本低成本高性能'
  },
  {
    id: 'glm-5-turbo',
    name: 'GLM-5 Turbo',
    provider: '智谱AI',
    providerColor: '#8B5CF6',
    inputPrice: 5,
    outputPrice: 22,
    cacheHitPrice: 1.2,
    contextWindow: 128000,
    features: ['旗舰级', '推理第一梯队', '多模态'],
    description: 'SWE-bench第一梯队，综合能力最强'
  },
  {
    id: 'minimax-m2.7',
    name: 'MiniMax M2.7',
    provider: 'MiniMax',
    providerColor: '#EC4899',
    inputPrice: 2.1,
    outputPrice: 8.4,
    cacheHitPrice: 0.42,
    cacheMissPrice: 2.1,
    contextWindow: 197000,
    features: ['多模态领先', '深度思考', '语音合成'],
    description: '多模态能力突出，适合视频生成和语音场景'
  },
  {
    id: 'kimi-k2.6',
    name: 'Kimi K2.6',
    provider: '月之暗面',
    providerColor: '#06B6D4',
    inputPrice: 6.5,
    outputPrice: 27,
    cacheHitPrice: 1.1,
    contextWindow: 1000000,
    features: ['长文本专家', '百万上下文', '知识密集'],
    description: '长文本处理能力优秀，适合知识密集型任务'
  },
  {
    id: 'claude-opus',
    name: 'Claude Opus 4.8',
    provider: 'Anthropic',
    providerColor: '#EF4444',
    inputPrice: 5,
    outputPrice: 25,
    contextWindow: 200000,
    features: ['安全性最高', '长上下文', '企业安全'],
    description: '安全性和可靠性领先，适合企业级应用'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerColor: '#10B981',
    inputPrice: 2.5,
    outputPrice: 10,
    cacheHitPrice: 1.25,
    contextWindow: 128000,
    features: ['综合能力最强', '多模态', '生态完善'],
    description: '当前最全面的模型，适合各种场景'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    providerColor: '#F59E0B',
    inputPrice: 1.25,
    outputPrice: 5,
    contextWindow: 1000000,
    features: ['超长上下文', '多模态', 'Google生态'],
    description: '超长上下文和多模态能力突出'
  }
]

export const providers = Array.from(new Set(modelPricingData.map(m => m.provider)))
