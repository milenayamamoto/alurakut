import styled from 'styled-components'

const MainGrid = styled.main`
  width: 100%;
  grid-gap: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  padding: 16px;
  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }
  .welcomeBox {
    border-top-right-radius: 50px;
    .actions {
      .actionButttons {
        display: flex;
        gap: 8px;
      }
      .actionsButton {
        padding: 2px 12px;
        background: #fff;
        color: #6f92bb;
        border: 1px solid #f4f4f4;
        border-radius: 8px 8px 0px 0px;
      }
      .active {
        padding: 2px 12px;
        background: #6f92bb;
        border: 1px solid #f4f4f4;
        border-radius: 8px 8px 0px 0px;
        color: #fff;
      }
      .scrapBox {
        border: 1px solid #f4f4f4;
        height: 40px;
        position: relative;

        .inputScrap {
          background-color: inherit;
          color: #5a5a5a;
          border-radius: 0;
          height: 40px;
        }
        .addScrap {
          position: absolute;
          left: 450px;
          top: 9px;
        }
      }
      .communityBox {
        border: 1px solid #f4f4f4;
        padding: 15px;
      }
    }
    .updates {
      display: flex;
      flex-direction: column;
      gap: 18px;
      font-family: Verdana;
      font-style: normal;
      font-size: 12px;
      line-height: 15px;
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
    grid-template-areas: 'profileArea welcomeArea profileRelationsArea';
    grid-template-columns: 160px 1fr 312px;
  }
`

export default MainGrid
