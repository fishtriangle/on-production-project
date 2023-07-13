import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

/**
 * Redesigned, use proper component.
 * @deprecated
 */
export const VStack = (props: VStackProps) => {
  const { align = 'start' } = props;

  return <Flex {...props} direction="column" align={align} />;
};
