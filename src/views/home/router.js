/* eslint-disable */
import pageOne from '../pageone/App'
import pageTwo from '../pagetwo/App'
import pageOneRoutes from '../pageone/router'
import pageTwoRoutes from '../pagetwo/router'

const handleArr = ['path', 'redirect']
const handleChildrenPath = (routes, pageKey) => routes.map((item) => {
  Object.keys(item).forEach((v) => {
    handleArr.includes(v) && (item[v] = item[v].replace('/', ''))
  })
  item.name = `${pageKey}.${item.name}`
  return item
})
const pageOneChildren = handleChildrenPath(pageOneRoutes, 'pageone')
const pageTwoChildren = handleChildrenPath(pageTwoRoutes, 'pagetwo')

export default  [
    {
        path: '/pageone',
        component: pageOne,
        children: pageOneChildren
    },
    {
      path: '/pagetwo',
      component: pageTwo,
      children: pageTwoChildren
    },
    {
      path: '/',
      redirect: '/pageone'
    }
]
