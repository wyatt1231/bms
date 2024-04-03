import styled from "styled-components";

export const StyledUserProfile = styled.div`
  .header {
    display: grid;
    grid-auto-flow: row;
    /* grid-template-areas: "image" "user"; */
    align-items: center;
    align-content: center;
    justify-items: center;
    text-align: center;
    grid-gap: 0.5em;
    color: ${(p) => p.theme.sidebar.color} !important;

    &:hover {
      cursor: pointer;

      .profile-image,
      .icon {
        transition: 0.3s all ease-in-out;
      }
    }
    .profile-image {
      height: 3.5em !important;
      width: 3.5em !important;
      img {
        /* margin: 0.5em; */
      }
    }

    .user {
      display: grid;
      grid-gap: 0.3em;
      .fullname {
        font-size: 0.87em;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-transform: capitalize;
        font-weight: 900;
      }
      .designation {
        font-size: 0.77em;
        text-transform: capitalize;
      }
    }
  }

  .MuiPopover-root {
    background-color: red !important;
    & > .content-header {
      background-color: red !important;
      color: red;
    }
    &.content-header {
      background-color: red !important;
      color: red;
    }

    .content-header {
      background-color: red !important;
      color: red;
    }
  }
`;

export const StyledPopOverContent = styled.div`
  max-width: 360px;
  min-width: 250px;
  .content-header {
    overflow: hidden;
    display: grid;
    grid-auto-flow: column;
    align-content: center;
    justify-content: start;
    align-items: center;
    justify-items: start;
    grid-gap: 1em;
    padding: 1em;
    grid-auto-columns: 50px 1fr 100px;
    background-color: #e2f3f5;

    .content-header-image {
      height: 50px;
      width: 50px;
    }
    .content-header-user {
      font-size: 0.8em;
      text-transform: capitalize;

      .name {
        font-weight: 600;
      }
    }

    .btn-logout {
      color: black;
    }
  }

  .content-body {
    padding: 1.5em;
    padding-top: 1em;
    font-size: 0.87em;

    .content-title {
      font-weight: 900;
      color: rgba(0, 0, 0, 0.6);
    }
    .content-items {
      margin-top: 0.5em;
      display: grid;
      grid-gap: 0.5em;
    }
    .link {
      padding: 0.5em 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      color: rgba(0, 0, 0, 0.6);
      &:hover {
        color: blue;
      }
    }
  }
`;
