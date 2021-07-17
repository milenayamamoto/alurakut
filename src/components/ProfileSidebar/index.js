import Box from '../Box'
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

export function ProfileSidebar(prop) {
  const { githubUser } = prop

  return (
    <Box as='aside'>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
