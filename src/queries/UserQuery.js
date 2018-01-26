import gql from 'graphql-tag'

export default gql`query UserQuery($id: ID!) {
    user(id: $id) {
        email
        id
        first_name
        avatar
        active
        podcasts {
            id
            title
            image_URL
            description
        }
    }
  }`