import React from 'react'

type ApprovalProps = {
    handleConfirm?: React.MouseEventHandler
}

export function Approval({ handleConfirm }: ApprovalProps) {
    return (
        <div className="squeak-approval-required">
            <h3>Post submitted</h3>
            <p>New posts require approval from a moderator. Check back soon!</p>
            <p>(You'll also receive an email when answers are posted.)</p>
            <button onClick={handleConfirm} className="squeak-post-button">
                Got it
            </button>
        </div>
    )
}
