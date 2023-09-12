//researcher can see stats from school.
import { React } from 'react';

function Stats() {
    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <h1>Some Basic Statistics for Maple Leaf University</h1>


            <table border="3" class="center">
                <tr>
                    <th>Number of Students Enrolled</th>
                    <th>Number of Undergraduate Students Enrolled</th>
                    <th>Number of Graduate Students Enrolled</th>
                    <th>Number of Faculty Members</th>

                </tr>
                <tr>
                    <td>1300</td>
                    <td>1000</td>
                    <td>300</td>
                    <td>550</td>
                </tr>
            </table>

        </>
    );
}
export default Stats;