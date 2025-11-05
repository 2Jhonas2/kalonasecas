TC.jsx
import React from "react";
import "./TC.css";
import ReactDOM from "react-dom";

/**
 * Componente TC (Términos y Condiciones).
 * Muestra un modal con los términos y condiciones de uso de la aplicación.
 * Utiliza `ReactDOM.createPortal` para renderizar el modal fuera del árbol DOM principal,
 * lo que ayuda con el posicionamiento y la superposición.
 * @param {object} props Las propiedades del componente.
 * @param {boolean} props.isOpen Indica si el modal debe estar abierto o cerrado.
 * @param {Function} props.onClose Función para cerrar el modal.
 */
export default function TC({ isOpen, onClose }) {
    console.log('TC.jsx: Renderizando TC, isOpen:', isOpen); // <-- Nuevo console.log
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modalOverlayTerms" id="termsModalOverlay">
            <div className="modalContentTerms">
                <div>
                    <h2 className="titleTerms">Terms and Conditions of Use</h2>
                    <h3 className="subTitleTerms">Last update: [05/09/2025]</h3>
                    <p className="textContentTerms">
                        Welcome to Kalon Itinere. By accessing and using our web application, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with any of them, please refrain from using our services.
                    </p>
                    <p className="textContentTerms">
                        Access and use of the Platform imply full acceptance of these Terms and Conditions. The use of certain services may be subject to specific conditions that will be communicated at the appropriate time.
                    </p>
                </div>

                <div>
                    <ol className="listTerms">
                        <div>
                            <strong><li>Definitions</li></strong>
                            <p>• <strong>Platform:</strong> Refers to the Kalon Itinere web application.</p>
                            <p>• <strong>User:</strong> Person who accesses, navigates, registers, or uses the Platform.</p>
                            <p>• <strong>Account:</strong> Profile created by the User to access specific features.</p>
                            <p>• <strong>Content:</strong> Information, data, text, graphics, images, logos, software, and any other materials available on the Platform.</p>
                            <p>• <strong>Services:</strong> Features, products, or benefits made available by Kalon Itinere to the User.</p>
                            <p>• <strong>Third Parties:</strong> Individuals or entities not affiliated with Kalon Itinere, with whom the User may interact directly or indirectly through the Platform.</p>
                        </div>

                        <div>
                            <strong><li>Acceptance of Terms</li></strong>
                            <p>The access and use of the Platform imply full acceptance of these Terms and Conditions. The use of certain services may be subject to specific conditions that will be communicated in due course.</p>
                        </div>

                        <div>
                            <strong><li>Registration and User Accounts</li></strong>
                            <p>• The User must provide truthful, complete, and updated information.</p>
                            <p>• It is prohibited to create false accounts or impersonate others.</p>
                            <p>• The User is responsible for maintaining the confidentiality of their password.</p>
                            <p>• Kalon Itinere reserves the right to suspend or cancel accounts that breach these terms.</p>
                            <p>• The Account is personal and non-transferable. Sharing it with third parties is not allowed without prior authorization.</p>
                            <p>• The User must notify Kalon Itinere immediately in case of unauthorized use of their Account.</p>
                        </div>

                        <div>
                            <strong><li>Permitted Use of the Platform</li></strong>
                            <p>• The User agrees not to use the Platform for fraudulent, illegal, or unauthorized purposes.</p>
                            <p>• The User agrees not to alter, modify, or reverse-engineer the Platform’s software.</p>
                            <p>• The User agrees not to introduce viruses, malware, or any harmful code.</p>
                            <p>• The User agrees to respect copyright, trademarks, and other intellectual property rights.</p>
                            <p>• The User agrees not to use the Platform for spamming, unauthorized advertising, or mass communications.</p>
                            <p>• The User agrees not to collect personal data from other users without their express consent.</p>
                        </div>

                        <div>
                            <strong><li>Intellectual Property</li></strong>
                            <p>• All content and elements on the Platform are the exclusive property of Kalon Itinere or licensed for use.</p>
                            <p>• Reproduction, distribution, public communication, or modification without express authorization is prohibited.</p>
                            <p>• The User retains rights over the content they post on the Platform but grants Kalon Itinere a non-exclusive, free, worldwide license to display and distribute it within the application.</p>
                            <p>• Misuse of intellectual property may lead to civil and/or criminal legal actions.</p>
                        </div>

                        <div>
                            <strong><li>User-Generated Content</li></strong>
                            <p>• The User is responsible for the content they post on the Platform.</p>
                            <p>• Posting offensive, illegal, discriminatory, violent, or infringing content is prohibited.</p>
                            <p>• Kalon Itinere may remove any content that violates these rules.</p>
                            <p>• The User agrees that their content may be moderated, reviewed, or removed without prior notice.</p>
                        </div>

                        <div>
                            <strong><li>Services and Features</li></strong>
                            <p>• Kalon Itinere offers [describe services: examples: information, consultations, digital resources, community forums, etc.].</p>
                            <p>• Some services may be subject to additional fees or conditions.</p>
                            <p>• Kalon Itinere reserves the right to modify, expand, or remove features at any time.</p>
                        </div>

                        <div>
                            <strong><li>Payments and Billing</li></strong>
                            <p>• Prices will be clearly indicated on the Platform.</p>
                            <p>• Payments are made through trusted external providers.</p>
                            <p>• Kalon Itinere will store the User’s banking information under strict security measures.</p>
                            <p>• No refunds will be issued unless required by applicable law.</p>
                            <p>• The User agrees to provide truthful and updated payment information.</p>
                            <p>• Any attempt of fraud will result in the immediate cancellation of the Account.</p>
                        </div>

                        <div>
                            <strong><li>Third-Party Links</li></strong>
                            <p>The Platform may contain links to external websites. Kalon Itinere does not control or take responsibility for the content, services, or privacy practices of these sites. The User accesses them at their own risk.</p>
                        </div>

                        <div>
                            <strong><li>Limitation of Liability</li></strong>
                            <p>• The Platform is provided “as is” and “as available.”</p>
                            <p>• Kalon Itinere does not guarantee that the service will be uninterrupted or free from third-party risks.</p>
                            <p>• The User agrees that use of the Platform is at their own risk.</p>
                            <p>• Kalon Itinere will not be liable for indirect, incidental, or consequential damages.</p>
                            <p>• Kalon Itinere is not responsible for losses arising from errors in the information provided by Users.</p>
                        </div>

                        <div>
                            <strong><li>Suspension and Cancellation</li></strong>
                            <p>• Kalon Itinere may suspend or permanently cancel a User's access if they detect conduct that violates these Terms and Conditions.</p>
                            <p>• The User may request the deletion of their Account at any time.</p>
                            <p>• Suspension or cancellation does not exempt the User from pending financial obligations.</p>
                        </div>

                        <div>
                            <strong><li>Data Protection</li></strong>
                            <p>Personal data processing will be governed by the Privacy Policy, which is an integral part of this document. Kalon Itinere will apply technical and organizational security measures to protect information.</p>
                        </div>

                        <div>
                            <strong><li>Electronic Communications</li></strong>
                            <p>By using the Platform, the User agrees to receive notifications, emails, or electronic messages related to the service. The User may request the cancellation of commercial communications at any time.</p>
                        </div>

                        <div>
                            <strong><li>Modification of the Terms</li></strong>
                            <p>Kalon Itinere reserves the right to modify these Terms and Conditions at any time. Modifications will take effect upon publication on the Platform.</p>
                        </div>

                        <div>
                            <strong><li>Software Ownership</li></strong>
                            <p>The source code, algorithms, and features of the Platform are the exclusive property of Kalon Itinere. Copying, distribution, or unauthorized use is prohibited.</p>
                        </div>

                        <div>
                            <strong><li>Jurisdiction and Applicable Law</li></strong>
                            <p>These Terms will be governed by the laws of [country]. Any disputes will be subject to the competent courts in Kalon Itinere's jurisdiction.</p>
                        </div>

                        <div>
                            <strong><li>Force Majeure</li></strong>
                            <p>Kalon Itinere will not be liable for failures resulting from circumstances beyond its reasonable control, such as technical failures, natural disasters, pandemics, labor conflicts, or interruptions of third-party services.</p>
                        </div>

                        <div>
                            <strong><li>Assignment</li></strong>
                            <p>The User may not assign their rights or obligations under these Terms without prior authorization. Kalon Itinere may freely assign them to third parties.</p>
                        </div>
                        <div>
                            <strong><li>Rights of Minors</li></strong>
                            <p>• Use of the Platform by minors requires the supervision and consent of their parents or legal guardians.</p>
                            <p>• Kalon Itinere is not responsible for misuse of the Platform by minors.</p>
                        </div>

                        <div>
                            <strong><li>Community Rules</li></strong>
                            <p>• Users must interact with respect and courtesy.</p>
                            <p>• Harassing, defaming, intimidating, or threatening other Users is prohibited.</p>
                            <p>• Kalon Itinere may block or expel Users who violate these community rules.</p>
                        </div>

                        <div>
                            <strong><li>Prohibition of Discriminatory or Offensive Behavior</li></strong>
                            <p>• Discriminatory, offensive, or hate speech is prohibited on the Platform.</p>
                            <p>• Kalon Itinere reserves the right to remove content and suspend or cancel accounts involved in such behavior.</p>
                        </div>

                        <div>
                            <strong><li>Confidentiality and Security</li></strong>
                            <p>• The User agrees to maintain the confidentiality of any personal or confidential information they may access while using the Platform.</p>
                            <p>• Kalon Itinere will implement reasonable security measures to protect user data but does not guarantee absolute security.</p>
                        </div>

                        <div>
                            <strong><li>Changes to the Platform</li></strong>
                            <p>• Kalon Itinere may modify, suspend, or discontinue any aspect of the Platform at its discretion, without prior notice.</p>
                            <p>• These changes may affect the services available or introduce new features or conditions.</p>
                        </div>

                        <div>
                            <strong><li>Indemnity</li></strong>
                            <p>The User agrees to indemnify and hold harmless Kalon Itinere, its affiliates, and partners from any claims, damages, losses, or liabilities arising from their use of the Platform or violation of these Terms and Conditions.</p>
                        </div>

                        <div>
                            <strong><li>Governing Language</li></strong>
                            <p>In the event of discrepancies between the translated versions of these Terms, the original language version shall prevail.</p>
                        </div>

                        <div>
                            <strong><li>Severability</li></strong>
                            <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remainder of these Terms will remain in full effect.</p>
                        </div>

                        <div>
                            <strong><li>Entire Agreement</li></strong>
                            <p>These Terms and Conditions, along with the Privacy Policy and any other agreements incorporated by reference, constitute the entire agreement between the User and Kalon Itinere.</p>
                        </div>

                        <div>
                            <strong><li>Contact Information</li></strong>
                            <p>If you have any questions or need further information about these Terms and Conditions, please contact Kalon Itinere at [email address] or through our contact form on the Platform.</p>
                        </div>
                    </ol>
                    <button className="closeBtnTerms" onClick={onClose}>Acept terms and conditions</button>
                </div>
            </div>
        </div>,
        document.body
    );
}