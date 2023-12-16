import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import SiteSetting from './views/pages/sitesettings/SiteSettings'
import AddContent from './views/pages/ckeditor/addContent'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const CKEditor = React.lazy(() => import('./views/pages/ckeditor/ckEditor'))
const Forgotpassword = React.lazy(() => import('./views/pages/forgotpassword/Forgotpassword'))
const Forgotpattern = React.lazy(() => import('./views/pages/forgotpattern/Forgotpattern'))

const Changepattern = React.lazy(() => import('./views/pages/Changepattern/changepattern'))
const Twofactor = React.lazy(() => import('./views/pages/Twofactor/TwoFactorAuth'))
const Forgotmailpassword = React.lazy(() => import('./views/pages/mailverify/passwordmail'))
const Forgotmailpattern = React.lazy(() => import('./views/pages/mailverify/patternmail'))
const ForgetPasswordAuthCodeVerify = React.lazy(() =>
  import('./views/pages/forgotpassword/ForgetPasswordAuthCodeVerify'),
)
const ForgetPatternAuthCodeVerify = React.lazy(() =>
  import('./views/pages/forgotpattern/ForgetPatternAuthCodeVerify'),
)

const VerifyKyc = React.lazy(() => import('./views/pages/verifyKyc/VerifyKyc'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/forgotpassword" element={<Forgotpassword />} />
            <Route exact path="/forgotpattern" element={<Forgotpattern />} />
            <Route exact path="/changepattern" element={<Changepattern />} />
            <Route exact path="/passwordmail" element={<Forgotmailpassword />} />
            <Route exact path="/patternmail" element={<Forgotmailpattern />} />
            <Route exact path="/ckeditor/:id" element={<CKEditor />} />
            <Route exact path="/sitesettings" element={<SiteSetting />} />
            <Route exact path="/addcontent" element={<AddContent />} />
            <Route exact path="/verifyKyc" element={<VerifyKyc />} />
            <Route
              exact
              path="/forgetPasswordAuthCodeVerify"
              element={<ForgetPasswordAuthCodeVerify />}
            />
            <Route
              exact
              path="/forgetPatternAuthCodeVerify"
              element={<ForgetPatternAuthCodeVerify />}
            />
            <Route exact path="/twofactor" element={<Twofactor />} />

            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
