import type { SVGProps } from '@space-metaverse-ag/space-ui/icons'

interface ChildrenProps {
  label: string
  Icon: (props?: SVGProps) => JSX.Element
}

export interface OptionProps {
  Icon: (props?: SVGProps) => JSX.Element
  label: string
  children?: ChildrenProps[]
}

export type OptionComponentProps = OptionProps & {
  show: boolean
  select: (name: string) => void
  selected: string
  toggleState: VoidFunction
}

export interface OptionStylesProps {
  child?: boolean
  animate?: boolean
  selected?: boolean
}

export interface OptionsStylesProps {
  show?: boolean
  animate: boolean
}
