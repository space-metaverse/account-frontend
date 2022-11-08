import type { SVGProps } from '@space-metaverse-ag/space-ui/icons'

interface ChildrenProps {
  Icon: (props?: SVGProps) => JSX.Element
  route: string
  label: string
}

export interface OptionProps extends Pick<ChildrenProps, 'Icon' | 'label'> {
  route: string | null
  children?: ChildrenProps[]
}

export type OptionComponentProps = OptionProps & {
  show: boolean
  select: (name: string, route: string | null) => void
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
