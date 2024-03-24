import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clt2v15721vs707w7bcyqvcz2/master";

const getSlider = async () => {
  const slider_query = gql`
    query GetSlider {
      sliders {
        name
        id
        image {
          url
        }
      }
    }
  `;
  const sliderResponse = await request(MASTER_URL, slider_query);
  return sliderResponse;
};

const getCategories = async () => {
  const category_query = gql`
    query GetCategory {
      categories {
        name
        id
        image {
          url
        }
      }
    }
  `;
  const res = await request(MASTER_URL, category_query);

  return res;
};
const getBusinessList = async () => {
  const query = gql`
    query GetBusinessList {
      businessLists {
        email
        name
        id
        about
        address
        contactPerson
        images {
          url
        }
        category {
          id
          name
        }
      }
    }
  `;
  const res = await request(MASTER_URL, query);
  return res;
};

const getBusinessListByCategoryName = async (category = "") => {
  // console.log(category);
  const query =
    gql`
  query GetBusinessListByCategory {
    businessLists(where: {category: {name: "` +
    category +
    `"}}) {
      email
      name
      id
      about
      address
      contactPerson
      images {
        url
      }
      category {
        id
        name
      }
    }
  } 
  `;
  const res = await request(MASTER_URL, query);
  //console.log(res)
  return res;
};

const createBooking = async (bookingData) => {
 //   console.log(bookingData);
   
  const query = gql`
  mutation CreateBooking {
    createBooking(
      data: {
        bookingStatus: Booked
        businessList: { connect: { id: "${bookingData.businessid}" } }
        userEmail: "${bookingData.userEmail}"
        userName: "${bookingData.userName}"
        time: "${bookingData.time}"
        date: "${bookingData.date}"
      }
    ) {
      id
    }
     publishBooking(where: { id: "${bookingData.businessid}" }) {  
      id  
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
`;
  try {
    //console.log('try area------------------')
    //console.log(query)
    const res = await request(MASTER_URL, query);
    return res;  
  } catch (error) {
    console.log(error)
  }
  return res;
};


const GetUserBookings = async (userEmail ) => {
  // console.log(userEmail);
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: createdAt_DESC, where: {userEmail: "`+userEmail+`"}) {
        bookingStatus
        userName
        userEmail
        time
        id
        date
        businessList {
          id
          images {
            url
          }
          name
          
          address
          email
          contactPerson
        }
      }
    }
    
  `;
  const res = await request(MASTER_URL, query);  
  return res;
};
 

export const GlobalApi = {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategoryName,
  createBooking,
  GetUserBookings
};
