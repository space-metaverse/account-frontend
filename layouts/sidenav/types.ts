import type { SVGProps } from '@space-metaverse-ag/space-ui/icons'

interface ChildrenProps {
  Icon: (props?: SVGProps) => JSX.Element
  route: string
  label: string
  disabled?: boolean
}

export interface SimpleOptionProps extends Pick<ChildrenProps, 'Icon' | 'label'> {}

export interface OptionProps extends SimpleOptionProps {
  route: string | null
  disabled: boolean
  children?: ChildrenProps[]
}

export type OptionComponentProps = OptionProps & {
  show: boolean
  select: (option: SimpleOptionProps, route: string | null) => void
  selected?: string
  toggleState: VoidFunction
}

export interface OptionStylesProps {
  child?: boolean
  animate?: boolean
  disabled?: boolean
  selected?: boolean
}

export interface WrapperStylesProps {
  dropdown: boolean
}

export interface OptionsStylesProps {
  show?: boolean
  animate: boolean
}
