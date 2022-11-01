import Styled from './styled'
import { 
  User,
  Friends,
  Wallet,
  NFT,
  Collection,
  DropDown,
  ArrowLeft
} from "@space-metaverse-ag/space-ui/icons";

const options = [
  {
    label: "Profile",
    icon: User
  },
  {
    label: "Friends",
    icon: Friends
  },
  {
    label: "Connected Wallets",
    icon: Wallet
  },
  {
    label: "NFT Inventory",
    icon: NFT
  },
  {
    label: "Space Inventory",
    icon: Collection
  },
]

function OptionIcon ({ Icon }: any) {
  if (!Icon) return <></>
  return <Icon></Icon>
}


const Sidenav: React.FC = () => {

    return (
      <Styled.Wrapper>
        <Styled.Content>
          <Styled.Title>
            <button style={{backgroundColor: 'transparent', cursor: "pointer", borderWidth: 0, padding: 0}}>
              <ArrowLeft /> 
            </button>
            Account Settings 
          </Styled.Title>
        </Styled.Content>

        <Styled.Divider />
        <Styled.Content>
          <Styled.Options>
            {options.map((item, index) => {
              return <Styled.Option key={item.label}>
                <Styled.OptionContent >
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <OptionIcon Icon={item.icon} />
                    {item.label}
                  </div>
                  <DropDown />
                </Styled.OptionContent>
                { index !== options.length -1 && <Styled.Divider /> }
              </Styled.Option>
                
            })}
          </Styled.Options>
        </Styled.Content>
      </Styled.Wrapper>
    )
}

export default Sidenav;
