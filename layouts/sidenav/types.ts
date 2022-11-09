import type { SVGProps } from '@space-metaverse-ag/space-ui/icons'

interface ChildrenProps {
  Icon: (props?: SVGProps) => JSX.Element
  route: string
  label: string
  disabled?: boolean
}

export interface OptionProps extends Pick<ChildrenProps, 'Icon' | 'label'> {
  route: string | null
  disabled: boolean
  children?: ChildrenProps[]
}

export type OptionComponentProps = OptionProps & {
  show: boolean
  select: (name: string, icon: JSX.Element, route: string | null) => void
  selected: Pick<ChildrenProps, 'Icon' | 'label'> | null
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
