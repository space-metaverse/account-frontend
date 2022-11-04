import type { SVGProps } from '@space-metaverse-ag/space-ui/icons'

interface ChildrenProps {
  label: string
  Icon: (props?: SVGProps) => JSX.Element
}

export interface OptionProps {
  label: string
  Icon: (props?: SVGProps) => JSX.Element
  children?: ChildrenProps[]
}

export type OptionComponentProps = OptionProps & {
  show: boolean
  select: (name: string) => void
  selected: string
  toggleState: () => void
}
