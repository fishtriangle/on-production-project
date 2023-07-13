import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

/**
 * Redesigned, use proper component.
 * @deprecated
 */
export const HStack = (props: HStackProps) => (
  <Flex {...props} direction="row" />
);
