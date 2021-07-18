import styled from 'styled-components'

const CommunitiesGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  font-family: Verdana;
  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  .communitiesBox {
    h1 {
      font-style: normal;
      font-weight: normal;
      font-size: 28px;
      line-height: 33px;
      color: #333333;
    }
    .breadcrumb {
      font-family: Verdana;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      margin-top: 10px;
    }
    .communitiesList {
      margin-top: 20px;
    }
    .active {
      padding: 2px 12px;
      background: #6f92bb;
      border: 1px solid #f4f4f4;
      border-radius: 8px 8px 0px 0px;
      color: #fff;
    }
    .menu {
      border-top: 1px solid #f4f4f4;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      font-family: Verdana;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      color: #333333;
      a {
        text-decoration: none;
      }
    }
    ul {
      margin-top: 13px;
      li {
        height: 124px;
        list-style-type: none;
        display: flex;
        padding: 15px 10px;
        :nth-child(odd) {
          background: #d9e6f6;
        }
        :nth-child(even) {
          background: #f1f9fe;
        }
      }
      img {
        width: 95px;
        height: 95px;
        margin-right: 25px;
      }
    }
  }
  .orkutButton {
    display: flex;
    align-items: center;
    height: 21px;
    background: linear-gradient(180deg, #ffffff 69.27%, #e2e2e2 100%);
    border: 1px solid #c5c6ca;
    box-sizing: border-box;
    border-radius: 8px;
    color: #388bb0;
    font-family: Verdana;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    z-index: 1;
  }
  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 'profileArea communitiesBox';
    grid-template-columns: 160px 1fr;
  }
`

export default CommunitiesGrid
