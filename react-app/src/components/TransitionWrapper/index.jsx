import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

const TransitionWrapper = ({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={5000}>
        <div>
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(TransitionWrapper);