/** @jsx jsx */
import {jsx} from 'theme-ui'
import {Link} from 'gatsby'
import {Layout} from '@luminate/gatsby-theme-luminate/src'
import Header from '../components/RootHeader'

const IndexPage = () => {
  return (
    <Layout header={<Header />}>
      <div>
        <h3>Register?</h3>
        <Link to="/register">Go to register</Link>
      </div>
    </Layout>
  )
}

export default IndexPage
