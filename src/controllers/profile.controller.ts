/**
 * @type GET
 * @path /api/profile/dashboard
 * @description allows to user to see his/her details
 * @access PRIVATE
 */
export const profile = async (req: any, res: any) => {
    res.status(202).json({ message: "Success" });
}