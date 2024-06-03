const OnlyAdminCanAccess = async(req, res, next) => {

    try {

        if (req.user.role != 1 ) { // Not Equal to admin (Access only when the user role is 1)
            
            return res.status(400).json({
                success: false,
                msg: 'Access denied. Only Admin have permission for this operation.',
                NOT_PERMITTED:true
            });

        }

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Oops! Something went wrong. Please try again later.',
            NOT_PERMITTED:true

        });
    }

    return next();

};

module.exports = {
    OnlyAdminCanAccess
}

const OnlyEditorAdminCanAccess = async(req, res, next) => {

    try {


        if (req.user.role !== 1 && req.user.role !== 2 ) { // Not Equal to admin (Access only when the user role is 1)
            
            return res.status(400).json({
                success: false,
                msg: 'Access denied. Only Admin or Editor have permission for this operation.',
                NOT_PERMITTED:true
            });

        }

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Oops! Something went wrong. Please try again later.',
            NOT_PERMITTED:true

        });
    }

    return next();

};

module.exports = {
    OnlyAdminCanAccess,OnlyEditorAdminCanAccess
}