import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../consts/ArticleConsts';

export type ArticleSortField = 'createdAt' | 'views' | 'title' | '';

type Row = string[];

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType,
  title?: string,
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  paragraphs: string[];
}

export interface ArticleTableBlock extends ArticleBlockBase {
  type: ArticleBlockType.TABLE;
  rows: Row[]
}

export interface ArticleImageBlock extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export type ArticleBlock = ArticleTextBlock
  | ArticleImageBlock
  | ArticleCodeBlock
  | ArticleTableBlock;

export type ArticleView = 'LIST' | 'TABLE';

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  views: number;
  createdAt: string;
  user: User;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
