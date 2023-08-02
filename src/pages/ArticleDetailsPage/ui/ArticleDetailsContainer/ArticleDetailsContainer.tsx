import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticleDetailsConteinerProps {
  className?: string;
}

export const ArticleDetailsContainer = memo(
  (props: ArticleDetailsConteinerProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    return (
      <Card className={className} paddings="24" border="round" maxWidth>
        <ArticleDetails id={id} />
      </Card>
    );
  },
);
